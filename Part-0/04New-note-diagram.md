what happens when we go to
https://studies.cs.helsinki.fi/exampleapp/notes

1. we get notes html document which then calls main.css main.js
   2.renders main.css
   3.renders main.js
2. main .js fetches data from data.json to render it on the website
3. when we enter the new note and click submit the data goes to /exampleapp/new_note by POST method

6.then a new_note is stored on the sever which has the new note we created and the website is re rendered

```mermaid
sequenceDiagram
    participant Browser
    participant Server

    Browser->>Server: GET /exampleapp/notes
    activate Server
    Server-->>Browser: notes HTML document
    deactivate Server

    Browser->>Server: GET /exampleapp/main.css
    activate Server
    Server-->>Browser: main.css
    deactivate Server

    Browser->>Server: GET /exampleapp/main.js
    activate Server
    Server-->>Browser: main.js
    deactivate Server

    Note right of Browser: Browser loads CSS and executes JavaScript

    Browser->>Server: GET /exampleapp/data.json
    activate Server
    Server-->>Browser: Notes data (JSON)
    deactivate Server

    Note right of Browser: Notes are rendered on the page

    Note right of Browser: User writes a note and clicks Save

    Browser->>Server: POST /exampleapp/new_note
    activate Server
    Note left of Server: Server stores the new note
    Server-->>Browser: HTTP 302 Redirect
    deactivate Server

    Browser->>Server: GET /exampleapp/notes
    activate Server
    Server-->>Browser: Updated HTML page
    deactivate Server

    Browser->>Server: GET /exampleapp/data.json
    activate Server
    Server-->>Browser: Updated notes JSON
    deactivate Server

    Note right of Browser: Page is re-rendered with the new note
```
