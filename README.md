# Jenkins AI Chatbot Plugin

## Introduction

This plugin adds an AI-powered assistant interface to Jenkins. The chatbot is integrated directly into the Jenkins UI, allowing users to interact with a language model to get help, explanations, or support related to Jenkins usage, pipelines, and CI/CD tasks.

## Purpose of this plugin draft

This is an early prototype that shows the integration concept. It includes:
- A dedicated chatbot page with a clean UI built in React, accessible from the root Jenkins sidebar
- A quick access to the AI asssistant in every page
- Message interface styled like popular chat applications
- A first API structure connecting the Jenkins plugin (Java) to a Python backend(not yet implemented)

## Getting started

### 1. Build the React frontend

```bash
cd frontend
npm install
npm run build:jenkins
```

This builds the React frontend using Vite and automatically copies the output to:

```bash
src/main/webapp/static/
```
### 2. Build and run the Jenkins plugin

From the root of the project:

```bash
mvn clean install
mvn hpi:run
```

Once Jenkins boots up, you can quickly access to it with the chat button in the footer of every page. Otherwise, you can also navigate to the Jenkins AI Assistant page from the dashboard sidebar. The latter is not yet fully integrated and is not completely representative of the screenshots provided. To have a better preview of the chatbot UI page you can run:

```bash
cd frontend
npm run dev
```

This will start a local development server on http://localhost:5173(this is the standard port, but it might differ if it is already occupied), giving you access to the full chat interface independently.

Upon this time, I've mainly worked at the UI here, to have hot reload, without the need of building the React application and restarting Jenkins every time.

## Issues

More on this will be added in the future :)

Report issues and enhancements in the [Jenkins issue tracker](https://issues.jenkins.io/).

## Contributing

More on this will be added in the future :)

Refer to the [contribution guidelines](https://github.com/jenkinsci/.github/blob/master/CONTRIBUTING.md)

## LICENSE

Licensed under MIT, see [LICENSE](LICENSE.md)

