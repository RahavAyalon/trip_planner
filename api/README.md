### Get Started ###

#### Prerequisites ####
- pip
- **python version between 3.9 and 3.11**

#### Setup ####
1. Install venv, if not installed already:
```bash
sudo apt install python3.10-venv
```
2 

2. Install Redis (in memory cache for user queries and LLM responses)
```bash
sudo apt install lsb-release curl gpg
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
sudo apt-get update
sudo apt-get install redis 
```
3. Start the redis server:
```bash
sudo systemctl service redis-server start
```
3. Make sure the redis-server works properly:
```bash
sudo systemctl service redis-server status
```
or using
```bash
redis-cli
```
3. Install the backend's prerequisites:
```bash
pip install -r requirements.txt
```


How to install and run the app
2. How to test it
3. Rational behind key architectural decisions