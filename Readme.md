Usage
===============================

Installation :
```
npm install react-live-timer
```

Then
```javascript
var Timer = require('react-live-timer');

...

render: function() {
  return (
  	<div>
  		<Timer  pageBgColor='white' id={1} duration={10} started={true} paused={false} />
  	</div>
  )
}
```
See [Examples](examples/) for more details.

API
===============================

Timer
========

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| **id**   | number  | yes (if more than one timer used) | 1 | Element id is timerNo + **id**|
| **started**   | boolean  | yes | N/A | Represents whether timer has started |
| **paused**   | boolean  | yes | N/A | Represents whether timer is paused |
| **pageBgColor**   | string  | yes | undefined | Color of background of page (Reqd. to make draw the hourglass)|
| **outerColor**   | string  | no | 'white' | Color of empty part of hourglass|
| **innerColor**   | string  | no | 'grey' | Color of sand part of hourglass|
| **strokeColor**   | string  | no | 'black' | Color of border of hourglass|
| **size**   | number  | no | 10 | Size of hourglass|
| **duration** | number  | no | 60 | Represents duration of timer (time until hourglass is empty) in seconds |
| **onComplete**   | function  | no | undefined | Callback triggered when timer reaches countdown (hourglass becomes empty) |

Contributions
===============================
There are still plenty of ways to improve this project. Any contributions are appreciated.
