# Simple Todo

The following technologies are currently used and will likely need to be understood to complete the exercise:
- [NodeJS](https://nodejs.org/)
- [ExpressJS](https://expressjs.com/)
- [ReactJS](https://reactjs.org/)

### User Story
```
As a User with Todos,
I would like to mark Todos as completed rather than deleting them,
So that I can see how many Todos I have pending and have completed.
```

### Acceptance criteria
The following criteria is the minimum that must be implemented:
- Allow Todos to be marked as complete
- Display the number of completed and pending Todos to the User

## Getting started
Verify your node version:
```bash
$ node -v
```
> If you have a version less than v10, you will need to install [Node v10](https://www.npmjs.com/get-npm).

Install node dependencies:
```bash
$ yarn install
```

Start the project:
```bash
$ yarn start
```

Navigate to <http://localhost:3001/>

## Thoughts
- I'm most familiar with Angular 2+ and typescript so this was a good learning opportunity
- I spent some time before this learning some technologies/reading documentation for:
    - react
    - relay
    - graphql
- I attempted adding typescript to the project and failed, several times
- I also tried to implement relay, heavily referencing their todo example. 
    - I've since removed my attempts to clean up the project
    - I think I did a correct graphql schema :D ++
    - But they are removed, so I've just gained personal knowledge with nothing to share there.
- What was done:
    - I broke the todo app into 4 parts
    - I'm very familiar with redux but I didn't want to add an entire library...
        - so I did a very Angular thing and added a service. Which is used mostly like a class and then passed in as a prop to child components.
            - the service holds a local state, handling optimistic changes, http requests, and then syncs with the server on errors
    - I added a component for the input, the item itself, and the todo-list as a whole
        - the purpose was to reduce how much one file was doing and keep future changes easier to manage
    - I added in a css library, in this case it is: Tachyons. I'm generally a fan of atomic css :)
        - I had some fun changing the look/feel and imported some material-icons
    - I added in the update methods for the database, I also switched it to a map. We do convert to/from an array/map, but it made the functions a little easier to read.
- Overall a fun experience to solidify my understanding of react.

## TODO (ironic)
- convert to typescript
- consider relay vs redux vs no state?
- fix service to be injected properly
- add tests
- create a database and hook to it?
- allow more modifications whithin the ui
- add in prettier/stylelint/tslint config
- add in browserlist