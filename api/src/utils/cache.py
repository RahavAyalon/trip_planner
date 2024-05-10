import os
import redis

redis_client = redis.StrictRedis(host=os.getenv("REDIS_HOST"), port=os.getenv("REDIS_PORT"),
                                 password=os.getenv("REDIS_PASSWORD"), decode_responses=True)


def get_cached_response(key):
    if redis_client.exists(key):
        return redis_client.get(key)
    return None


def set_response_in_cache(key, value, expire_time=3600):
    redis_client.setex(key, expire_time, value)

