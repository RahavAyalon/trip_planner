from unittest.mock import MagicMock
import pytest
import json

from api.src.controllers.trips import plan_trip_controller

MOCKED_PROMPT = "Plan a trip to Paris, under 300$, 2 days"
MOCKED_RESPONSE = "Trip planned to Paris"
MOCKED_CACHED_RESPONSE = "Cached trip planned to Paris"


@pytest.fixture
def mock_openai_client(mocker):
    mock_client = mocker.MagicMock()
    mocker.patch('api.src.controllers.trips.client', new=mock_client)
    return mock_client


@pytest.fixture
def mock_logger(mocker):
    return mocker.patch('api.src.controllers.trips.logger')


@pytest.fixture
def mock_cache(mocker):
    mocker.patch('api.src.controllers.trips.get_cached_response', return_value=None)
    mocker.patch('api.src.controllers.trips.set_response_in_cache')


@pytest.fixture
def mock_validator(mocker):
    mocker.patch('api.src.controllers.trips.validate_prompt_injection', return_value=True)


@pytest.fixture
def mock_history(mocker):
    mocker.patch('api.src.controllers.trips.update_history')


def test_plan_trip_controller_successful(mock_openai_client, mock_logger, mock_cache, mock_validator, mock_history):
    prompt = MOCKED_PROMPT
    expected_response = {"content": MOCKED_RESPONSE}

    fake_response = MagicMock()
    fake_response.choices = [MagicMock(message=MagicMock(content=MOCKED_RESPONSE, tool_calls=None))]
    mock_openai_client.chat.completions.create.return_value = fake_response

    response = plan_trip_controller(prompt)

    assert response == expected_response
    mock_openai_client.chat.completions.create.assert_called()
    mock_logger.info.assert_called_with(str(fake_response.choices))


def test_plan_trip_controller_with_cached_response(mock_openai_client, mocker, mock_logger):
    prompt = MOCKED_PROMPT
    cached_response = json.dumps({"content": MOCKED_CACHED_RESPONSE})
    mocker.patch('api.src.controllers.trips.get_cached_response', return_value=cached_response)

    response = plan_trip_controller(prompt)

    assert response == json.loads(cached_response)
    mock_openai_client.chat.completions.create.assert_not_called()
    mock_logger.info.assert_called_with(prompt)


def test_plan_trip_controller_openai_service_unreachable(mock_openai_client, mock_logger, mock_cache, mock_validator):
    mock_openai_client.chat.completions.create.side_effect = Exception("API call failed")

    response = plan_trip_controller(MOCKED_PROMPT)

    assert response == {"error": "OpenAI Service Unreachable", "status_code": 503}
    mock_logger.error.assert_called_with("OpenAI API call failed: API call failed")


def test_plan_trip_controller_prompt_injection_attempt(mocker, mock_openai_client, mock_logger):
    prompt = "Malicious input"
    mocker.patch('api.src.controllers.trips.validate_prompt_injection', return_value=False)

    response = plan_trip_controller(prompt)

    assert response == {"error": "Prompt injection attempt detected", "status_code": 403}
    mock_logger.warning.assert_called_with("Prompt injection attempt detected for prompt: Malicious input")
