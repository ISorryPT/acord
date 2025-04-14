CREATE TABLE servers(
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL
);

CREATE TABLE channels(
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    server_id TEXT NOT NULL,
    UNIQUE(name)
    FOREIGN KEY (server_id) REFERENCES server(id) ON DELETE CASCADE
)