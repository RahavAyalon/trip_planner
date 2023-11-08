from llm_guard.input_scanners import PromptInjection
from llm_guard.input_scanners.prompt_injection import MatchType
def validate_prompt_input(location, budget, duration):
    if not location or not budget or not duration:
        return False

def validate_prompt_injection(prompt):
    scanner = PromptInjection(threshold=0.5, match_type=MatchType.FULL)
    sanitized_prompt, is_valid, risk_score = scanner.scan(prompt)
    return is_valid