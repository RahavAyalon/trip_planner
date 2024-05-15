import logging

logger = logging.getLogger('my_logger')
logger.setLevel(logging.DEBUG)  # Set the minimum log level

console_handler = logging.StreamHandler()  # Log messages to the console
file_handler = logging.FileHandler('app.log')  # Log messages to a file

console_handler.setLevel(logging.DEBUG)  # Only log warnings and above to console
file_handler.setLevel(logging.DEBUG)  # Log all debug and above messages to the file

console_format = logging.Formatter('%(name)s - %(levelname)s - %(message)s')
file_format = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
console_handler.setFormatter(console_format)
file_handler.setFormatter(file_format)

logger.addHandler(console_handler)
logger.addHandler(file_handler)

