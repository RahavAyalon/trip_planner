import os
import redis
from .logger import logger

redis_client = redis.StrictRedis(host=os.getenv("REDIS_HOST"), port=os.getenv("REDIS_PORT"),
                                 password=os.getenv("REDIS_PASSWORD"), decode_responses=True)


def get_cached_response(key):
    try:
        if redis_client.exists(key):
            return redis_client.get(key)
    except Exception as e:
        logger.warning("Redis error:", e)


def set_response_in_cache(key, value, expire_time=3600):
    try:
        redis_client.setex(key, expire_time, value)
    except Exception as e:
        logger.warning("Redis error:", e)


