Small Nodejs Burrito API (GET ONLY)

### Installation
Docker is needed to bring up the server and postgres. Run


```
docker-compose up
```

You may want to kill if anyother postgres is running locally:

```
docker kill $(docker ps -q) // run this with CAUTION
```

Once the server and database is up, we can hit the following URL:

```
GET Order Detail = http://localhost:3000/v1/api/order/<id> - id - sample data has only `1,2,3,4,5`
GET All Orders = http://localhost:3000/v1/api/orders
GET all Burritos = http://localhost:3000/v1/api/burritos
```


### Database (Postgres)
The DB schema and sample data is created via docker. Please refere to `init.sql` for the schema. 
Note: The total cost is a rough data, so its not validated. 

#### API keys
These are the API keys we can use for testing the API:

```
kWF2Ae36hIRpaRKCrZToQyOo4jjw5BD3VGScLF9LmtdPY3EoplGSiJ7ubjI3eXBJ
OsXTdCPnbQl29KqVD1YyYvXykduQVlHzcBa25WKkbhtjdpj0JDG8Z1NDxKicYbqO
Yb4fkfZrkzwYwrMF2NbMHaNRmaHNziqHVp9j60QQLicPjq8G593elg1vo8QnIPUZ
```

#### Testing

Here are the curl commands:

List of burritos
```
curl --location --request GET 'http://localhost:3000/v1/api/burritos' \
--header 'x-api-key: kWF2Ae36hIRpaRKCrZToQyOo4jjw5BD3VGScLF9LmtdPY3EoplGSiJ7ubjI3eXBJ'
```

List of orders
```
curl --location --request GET 'http://localhost:3000/v1/api/orders' \
--header 'x-api-key: kWF2Ae36hIRpaRKCrZToQyOo4jjw5BD3VGScLF9LmtdPY3EoplGSiJ7ubjI3eXBJ'
```

Get specific order detail
```
curl --location --request GET 'http://localhost:3000/v1/api/order/1' \
--header 'x-api-key: kWF2Ae36hIRpaRKCrZToQyOo4jjw5BD3VGScLF9LmtdPY3EoplGSiJ7ubjI3eXBJ'
```

#### Note
Password for the postgres is hardcoded, but in general these should come from secrets. 


