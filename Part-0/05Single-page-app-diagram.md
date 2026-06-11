Create a diagram depicting the situation where the user goes to the single-page app version of the notes app at https://studies.cs.helsinki.fi/exampleapp/spa.

1.browser send get equest to spa html document
2.spa html document renders and then calls main.css and spa.js
3.spa.js then calls data.json which contains the contents and date of the notes created
4.then the notes are rendered

```mermaid
sequenceDiagram
    participant Browser
    participant Server

    Browser->>Server: GET /exampleapp/spa
    activate Server
    Server-->>Browser: spa HTML document
    deactivate Server

    Browser->>Server: GET /exampleapp/main.css
    activate Server
    Server-->>Browser: main.css
    deactivate Server

    Browser->>Server: GET /exampleapp/spa.js
    activate Server
    Server-->>Browser: spa.js
    deactivate Server

    Note right of Browser: Browser loads CSS and executes spa.js

    Browser->>Server: GET /exampleapp/data.json
    activate Server
    Server-->>Browser: Notes data as JSON
    deactivate Server

    Note right of Browser: spa.js renders the notes on the page
```
