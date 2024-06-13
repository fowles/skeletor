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

#### How do I move a single event within a skeleton?

You have two options:

1. Create a new event at the appropriate time and delete the old one.

1. Put it in a new skeleton by changing its skeletor key, then move
   it, and then change its skeletor key back to the original.

### Errors

If any skeleton has turned red, there is an error with it.  If you feel
comfortable debugging javascript, go have fun with that.  If you don't, just
replace each event with a new one you create from scratch.

The most common cause of errors is moving two events in a skeleton before
skeletor has had a chance to move the entire skeleton.

## Installation and Setup

You should only have to do these steps once.

### Enable App Script for your gmail account.

Go to [Google User Settings](https://script.google.com/home/usersettings) and
change "Google Apps Script API" to "On".

### Create a personal app for skeletor.

1. Go to [App Script Home](https://script.google.com/home)
1. Click "New Project" in the upper left.
1. Rename the project from "Untitled Project" to "Skeletor" by clicking
   "Untitled Project" at the top.
1. Replace the entire contents of `Code.gs` (which should contain an empty
   `myFunction`) with the contents of
   [calendar.js](https://raw.githubusercontent.com/fowles/skeletor/main/calendar.js).
1. Save the project.

### Grant your copy of skeletor permissions.

1. Run the function `updateAllSkeletons()` via the small grey run button at the top center.

   ![Run Button](https://raw.githubusercontent.com/fowles/skeletor/main/docs/run_button.png)

1. Select 'Review Permissions'.

1. Select your gmail account.

1. Click the small grey "Advanced" text in the lower left, acknowledging that
   this is not a verified app.

   ![Unverified App](https://raw.githubusercontent.com/fowles/skeletor/main/docs/unverified_app.png)

1. Select the small grey text that says "Go to Skeletor (unsafe)" in the lower
   left.

   ![Trust Developer](https://raw.githubusercontent.com/fowles/skeletor/main/docs/trust_developer.png)

1. Select "Allow"

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

1. Select "Save".  This may require you to go through the permissions flow
   another time, and may require you to click "Save" twice.

At this point the list of triggers should contain one entry.

## FAQ

### What happens if I delete an event?

It should disappear and leave the rest of the skeleton unaffected.

### Why does this need so many permissions?

Because it needs to read and write your calendar events to move them.

### Why does this have so many untrusted warnings?

Because it is just some code a random person (me) wrote and you probably should
be careful trusting strangers.

### Can I trust you?

Well, yes.  But that is also what an untrustworthy person would say.

### This is amazing!  How can I ever repay you?  Would my first born child be sufficient?

Umm... that got weird quickly.  Glad you like it.  If you ever run into me in
person, by me lunch or a coffee or something.  If you don't, try to be a good
person.
