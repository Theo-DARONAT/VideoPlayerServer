# VideoPlayerServer

This server use a database PostgreSQL
This server is used with this [API](https://github.com/Theo-DARONAT/VideoPlayerApp.git)

# Starting the server for the first time ?

Like precised before, this server run with a database PostgreSQL.
So first you have to run a postgres server like: ```postgres -k /tmp```

After that, run the following commands to enter in postgres and create the required database:

```psql postgres```

```create database youreliefdata;```

The name of the database is important, don't change it.
Now you can leave using \q.

Don't close the postgres server, you need it to communicate with the video player server.

# How to start the server

Run your postgres server, for example: ```postgres -k /tmp```

After that use the following command to start the server: ```node database.js```

Your are now able to use this server with the corresponding [app](https://github.com/Theo-DARONAT/VideoPlayerApp.git)

# Thank you !
