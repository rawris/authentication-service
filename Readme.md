# Authentication Microservice

![Authentication Microservice](https://media-exp1.licdn.com/dms/image/C5622AQFzqR9pMFtTGA/feedshare-shrink_2048_1536/0?e=1592438400&v=beta&t=rj4Kcg36yo-a8aX2ItOMxl-m5acMSPn51Id65YKl_h4)

Boilerplate for an Authentication Micro service using Node.js. Whenever we talk about setting up an authentication service. We usually have some elements which are common in every authentication service. Which includes functionalities like.

- Sign up
- Sign In
- JWT Token
- Validation of JWT Token
- Forgot Password

The main idea here is to take these functionalities and make this boilerplate independent from any database technology or any logger technology. So, that any developer with any underlying Database can get an authentication service up and running with minimal effort. All they have to do is write all their DB logic inside ```database.js```. We have already defined the functions where you can write your DB logic and everything will work smoothly. If you are using any logger service, You can define your logging library and logic inside ```log.js```. We have included an example ```env``` file called ```env.example```. You can define all your variables here.
## Installation

```bash
npm install
```


```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
```

## To Do
- Need to add Test Cases.
