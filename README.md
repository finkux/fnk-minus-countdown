# fnk-minus-countdown
## Minimal countdown jquery plugin.

This is a personal countdown jquery pluging used in multiple projects.



### Options

| Option         | Description                             |
| -------------- | ---                                     |
| `targetDate`   | Set date UTC format here                |
|                |                                         |
| `interval`     | Time interval by default 1000 ms        |
| `endMessage`   | Show a message when targetDate is finished. Default Expired |
| `days`         | Switch to show days or not. Default true |
| `hours`        | Switch to show hours or not. Default true |
| `minutes`      | Switch to show minutes or not. Default true |
| `seconds`      | Switch to show seconds or not. Default true |
| `classNum`     | Add class to number elemnts. Default "fnk-minus-cd-num" |
| `classDays`    | Add class to days element. Default "fnk-minus-cd-num" |
| `classHours`   | Add class to hours element. Default "fnk-minus-cd-num" |
| `classMin`     | Add class to minutes element. Default "fnk-minus-cd-num" |
| `classSec`     | Add class to seconds element. Default "fnk-minus-cd-num" |
| `stopTimer`    | Useful to stop timer when you need to style elements. |
| `labels`       | Show labels under digits. Default true |
| `labelsStr`    | Object with label strings for translations. Default: 
                {
                    'days': 'days',
                    'hours': 'hours',
                    'minutes': 'min',
                    'seconds': 'sec'
                }|

### Callbacks

| Callback       | Description                             |
| -------------- | ---                                     |
| `isActive`     | Return a boolean depending of his state is active or ended for each interval |
| `isEnded`      | Check if is ended |