---
layout: image
title: What is GraphQL?
image: /assets/graphql.png
---

---
title: What is GraphQL?
---

<style>
  .slidev-layout {
    height: 100%;
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
query($id: ID!, $includeName: boolean) {
  user(id: $id) {
    name @include($includeName)
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
