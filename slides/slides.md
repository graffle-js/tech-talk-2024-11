---
theme: apple-basic
transition: slide-up
mdc: true
overviewSnapshots: true
fonts:
  sans: 'Inter'
layout: intro-image-right
image: /assets/logo.svg
title: Welcome
hideInToc: true
---


# GRAFFLE


## A Modular Type Safe GraphQL Client for JavaScript.

### Exploring Advanced Type Level techniques

<!--
- Hey everyone
- I'm here today to talk about building a modular type safe GraphQL client library
- Thanks to the Meetup organizers for having me as a speaker and to all of you for showing up today
-->

---
layout: statement
title: Hello
hideInToc: true
---

<img src="./assets/jason.png" class="w-50 rounded-full inline-block"  />
<p>Jason Kuhrt</p>
<p>🇨🇦 🏔️</p>

<!--
- First off a bit about me
- My name is Jason, I'm a Montreal-based developer with over 10 years experience
- I studied in design but through open-source gateway drugs like Wordpress, jQuery, Node, GitHub, etc. I found my way into this world of systems building
- I've worked on web apps, cloud services, automation, devops, architecture, libraries, etc.
- Some places I've worked at include Prisma, Dialogue, littleBits and in a few weeks I'm joining The Guild.
- I also work as an open source maintainer on various libraries
- And for the past five years especially I've worked extensively with TypeScript
- Since leaving Prisma this year I've focused my work on a new GraphQL client library called Graffle which is the basis for this talk today.
-->

---
hideInToc: true
---

# Plan

45 minutes

<toc></toc>

<!--
- Ok, so let's get started
- I'm going to briefly introduce Graffle
- Then we'll spend most of the time diving into implementation details of various features that have advanced type level logic
- Feel free to ask questions at any time if something isn't clear to you
-->

---
title: What is GraphQL?
---

# What is GraphQL?

<style>
  .slidev-layout {
    display: flex;
    flex-direction: column;
  }
  .slidev-code-wrapper {
    overflow: scroll;
  }
</style>

<div class="flex justify-center gap-10 min-h-0">
<div class="_col">

Schema

```graphql
scalar DateTime
scalar DateTimeOffset

type Query {
  user(id: ID!): User
}

type User {
  id: ID!
  name: String!
  actions(
    from: DateTimeOffset,
    to: DateTimeOffset,
    actionType: ActionType
  ): [Action!]!
}

enum ActionType {
  like
  message
}

union Action = ActionLike | ActionMessage

interface ActionBase {
  id: ID!
  createdAt: DateTime!
}

type ActionLike implements ActionBase {
  user: User!
  date: DateTime!
}

type ActionMessage implements ActionBase {
  content: String!
  to: User!
  from: User!
}
```

</div>
<div class="_col">

Request

```graphql
user(id: "abc123") {
  name
  messagesSince1WeekAgo: actions(
    from: "now-1w",
    actionType: message
  ) {
    __typename
    createdAt
    ... on ActionMessage {
      to {
        id
      }
      content
    }
  }
  likesSince2MonthsAgo: actions(
    from: "now-24h",
    actionType: like
  ) {
    __typename
    createdAt
    ... on ActionLike {
      user {
        id
      }
    }
  }
}
```

</div>
<div class="_col">

Data

```json
{
  "data": {
    "user": {
      "name": "John Doe",
      "messagesSince1WeekAgo": [
        {
          "__typename": "ActionMessage",
          "createdAt": "2024-01-01T22:55:43Z",
          "to": {
            "id": "def456"
          },
          "content": "Hello, world!"
        }
      ],
      "likesSince2MonthsAgo": [
        {
          "__typename": "ActionLike",
          "createdAt": "2023-12-15T16:12:78Z",
          "user": {
            "id": "ghi789"
          }
        }
      ]
    }
  }
}
```

</div>
</div>
<!--
- So if you're not familiar with GraphQL, this slide is for you
- I won't be going into detail about it today
-->

---

# What is Graffle?

- A TypeScript library
- For sending GraphQL requests
- That runs in browsers, Node, Deno, Bun
- That has multiple transports (http, memory)
- That has multiple interfaces (GraphQL, TypeScript)

<img src="./assets/website.png" class="absolute right--90 top--25 scale-70"  />


---
layout: statement
---

# Demo Time

---
layout: statement
---

# TS Technique 1: Addressable Global Type Augmentation

---
layout: statement
---

# TS Technique 2: Recursive Builder

---
layout: statement
---

# TS Technique 3: Type-Level Functions

---
layout: statement
---

# TS Technique 4: Generated Types

---
layout: statement
---

# TS Technique 5: Type Testing


---

# What's Next for Graffle

### Financial Support

- Handful of one-time donations (Open Collective)
- Sponsorship by The Guild

### Roadmap

- Modular Transports (in progress)
- GraphQL OneOf Support
- Defer & Stream Support
- Documentation (Website, JSDoc)
- Factor out Anyware library
- ...
- Q1 2025: First stable release!


_And hopefully your feedback on GitHub issues!_ 😊

---
layout: statement
---

# Thanks!

### https://graffle.js.org

### https://bsky.app/profile/kuhrt.me
