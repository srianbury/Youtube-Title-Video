# YouTube Title Video

## Easily embed your most viewed or most recent video!

### Quick Start:
  Example: https://youtube-title-video.herokuapp.com/v1/watch/UC-lHJZR3Gqxm24_Vd_AJ5Yw (PewDiePie's Most recent video)


### React JSON Example
[code sandbox](https://codesandbox.io/s/relaxed-noyce-t4el9)

### Options:
  - Video Options
    - Order
      - Most Recent (default)
        - ?order=date 
      - Most Viewed
        - ?order=viewcount
    
    - Format
      - Link (default) (redirects to the youtube page)
        - ?format=link
      - json Returns the videoId (you must format it)
        - ?format=json

#### Option Example
https://youtube-title-video.herokuapp.com/v1/watch/UC-lHJZR3Gqxm24_Vd_AJ5Yw?order=viewcount&format=json
    

### Inspiration
People with their own websites should be able to embed their most recent or popular video easily.  
This solution removes the need to have a backend server and doesn't expose a YouTube API key in the client's browser.
Redirects do not seem to be able to be iframes so I created the json endpoint to be used instead.  Requires some coding but you still don't need to have
a backend server or API key exposed.

# New Features
  Open to additional use cases and providing more data, just create a new issue.
