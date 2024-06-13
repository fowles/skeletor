# skeletor

Creates and maintains linked skeletons of Google calendar events that rigidly
move around as a single unit.

## Usage

After installation (see below), calendar events will be grouped into
"skeletons" based on their "skeletor key".

Any event with `skeletor: <key-name>` will be part of the `<key-name>` skeleton.
Skeletor will automatically color `skeletons` so you can easily see which ones
match.  It may reuse colors if you have a lot of skeletor keys though.

### Rigid Event Moves

When you move any event in a skeleton, all of the events in the skeleton will
adjust times to fit.  Unfortunately, google calendar is a bit slow to update, so
you may need to count to 5 and then reload your calendar page.

### Errors

If any skeleton has turned red, there is an error with it.  If you feel
comfortable debugging javascript, go have fun with that.  If you don't, just
replace each event with a new one you create from scratch.

The most common cause of errors is moving two events in a skeleton before
skeletor has had a chance to move the entire skeleton.

## Installation

### Enable App Script for your gmail account.

Go to [Google User Settings](https://script.google.com/home/usersettings) and
change "Google Apps Script API" to "On".

### Create a personal app for skeletor.

1. Go to [App Script Home](https://script.google.com/home)
1. Click "New Project" in the upper left.
1. Rename the project from "Unnamed Project" to "Skeletor" by clicking "Unnamed
   Project" at the top.
1. Replace the entire contents of `Code.gs` (which should contain an empty
   `myFunction`) with the contents of
   [calendar.js](https://raw.githubusercontent.com/fowles/skeletor/main/calendar.js).
1. Save the project.

### Grant your copy of skeletor permissions.

1. Run the function `updateAllSkeletons()` via the run button at the top.

1. Select 'Review Permissions'.

   ![Review Permissions](https://raw.githubusercontent.com/fowles/skeletor/main/docs/review_permissions.png)

1. Select your gmail account.

   ![Choose Account](https://raw.githubusercontent.com/fowles/skeletor/main/docs/choose_account.png)

1. Click the small gray "Advanced" text acknowledging that this is not a
   verified app.

   ![Unverified App](https://raw.githubusercontent.com/fowles/skeletor/main/docs/unverified_app.png)

1. Select the small gray text that says "Go to Skeletor (unsafe)".

   ![Trust Developer](https://raw.githubusercontent.com/fowles/skeletor/main/docs/trust_developer.png)

1. Select "Allow"

   ![Allow Permissions](https://raw.githubusercontent.com/fowles/skeletor/main/docs/allow_permissions.png)

At this point the app should execute, unless you already have configured events,
you shouldn't see it do much, but it will bring up the console with a log for
the run.

### Install an automatic trigger for your app.

1. Select "Triggers" on the left side bar (the text won't appear until you mouse
   over the little alarm clock icon).

   ![Triggers](https://raw.githubusercontent.com/fowles/skeletor/main/docs/triggers.png)

1. Select "Add Trigger" in the lower right.

1. Under "Select event source", change the selection from "Time-Driven" to "From
   calendar".

1. Under "Calendar owner email", put your gmail account.

1. Change "Failure notification settings" to "Notify me immediately".

1. Select "Save".
