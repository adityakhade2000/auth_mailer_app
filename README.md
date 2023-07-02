## This Repository Is Guide To Setup Auth Flow In NestJS

*********************************

### 1. To Validate And Transform Requests

#### Step 1.1: Install Dependencies:
  ```yarn add class-validator class-transformer```

<br>

#### Step 1.2: Add Following Code To main.ts
    app.useGlobalPipes(
      new ValidationPipe(
        { 
          whitelist: true, 
          transform: true, 
          forbidNonWhitelisted: true 
        }
      )
    );

****

### 2. To use .env config

  #### 2.1: Install Nest Config
  ```yarn add @nestjs/config```

  <br>

  #### 2.2: Add following code to app.module.ts imports array</h2>
    ConfigModule.forRoot({ isGlobal: true });
  <br>

  #### 2.3: Create ```.env``` file in project root folder and add required config
  <br>

  #### 2.4: Add following code to main.ts</h2>
      const config: ConfigService = app.get(ConfigService);
      const port: number = config.get<number>('PORT');

*************************

### 3. Database Connection

  #### 3.1: Install Following Dependecies
  ```yarn add @nestjs/typeorm pg typeorm```


***********************

### 4. Mailer Configuration:
Reference Document: https://notiz.dev/blog/send-emails-with-nestjs

  #### Step 1: Add following dependencies
  ```yarn add @nestjs-modules/mailer nodemailer handlebars```
  
  ```yarn add -D @types/nodemailer```

  #### Step 2: 
  ##### 2.1: Create mail module and service
  ```nest g module mail```
  ```nest g service mail```
  
  #### 2.2: Create template folder inside mail module folder and create .hbs file for template 
  

  #### Step 3: Add following compiler options to nest-cli.json
    "compilerOptions": {
      "assets": [{ "include": "shared/mail/templates/**/*", "outDir": "dist/" }],
      "watchAssets": true
    }


 #### Step: 4 Import mail module in module where you want to use and make use of send mail service to send emails

***************

### 5. Setting Up JWT Auth
  #### 4.1: Install Required Dependencies And Dev Dependcies:
  ```yarn add @nestjs/jwt @nestjs/passport passport-jwt passport```

  ```yarn add -D @types/passport-jwt @types/node```

  #### 4.2: 
  
  
 *****************************
 
 ### To Run The App
 #### Create New ```.env``` file and paste contents from ```.env.example``` and change respective config credentials
