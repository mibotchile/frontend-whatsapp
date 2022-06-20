<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/mibotchile/frontend-whatsapp">
    <img src="logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">OnbotGo - WhatsApp FrontEnd</h3>
</div>

### Built With

-   [Angular 13](https://angular.io/)
-   [Angular Material](https://material.angular.io/)
-   [VEX 13 Template](https://vex.visurel.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

-   Node 16.10
-   Angular CLI
    ```sh
    npm install -g @angular/cli
    ```

### Enviroments

```sh
# Local = Credenciales de Valhalla (environment.ts)
# Dev = Credenciales de Valhalla  (environment.dev.ts)
# Prod = Credenciales de WorkSpace  (environment.prod.ts)
```

### Installation

1. Install project dependencies
    ```sh
    npm install
    ```
2. Run the project
    ```sh
    # Development mode
    ng serve --configuration dev
    # Production mode
    ng serve --configuration production
    ```

<p align="right">(<a href="#top">back to top</a>)</p>

### Deploy Configuration

## Install firebase globally

npm i firebase-tools -g
firebase login
firebase init

## Set hosting

Dev = firebase target:apply hosting dev whatsapp-dev-onbotgo
Production = firebase target:apply hosting prod whatsapp-prod-onbotgo

## Deploy to Firebase

deploy prod
npm run build:master

deploy dev
npm run build:dev
