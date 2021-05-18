from argparse import ArgumentParser

from dodo_commands import CommandError, Dodo


def _args():
    parser = ArgumentParser(description="")

    # Add arguments to the parser here

    # Parse the arguments.
    args = Dodo.parse_args(parser, config_args=[])

    args.cwd = Dodo.get("/ROOT/src_dir")

    # Raise an error if something is not right
    if False:
        raise CommandError("Oops")

    return args


# Use safe=False if the script makes changes other than through Dodo.run
if Dodo.is_main(__name__, safe=True):
    args = _args()
    Dodo.run(
        [
            "env",
            "PGPASSWORD=dev",
            "psql",
            "-h",
            "postgres",
            "-U",
            "postgres",
            "-c",
            "CREATE DATABASE app;",
        ]
    )

    Dodo.run(
        [
            "env",
            "PGPASSWORD=dev",
            "psql",
            "-h",
            "postgres",
            "-U",
            "postgres",
            "-c",
            "CREATE USER app WITH CREATEDB PASSWORD 'dev';",
        ]
    )

    Dodo.run(
        [
            "env",
            "PGPASSWORD=dev",
            "psql",
            "-h",
            "postgres",
            "-U",
            "postgres",
            "-c",
            "GRANT ALL PRIVILEGES ON DATABASE app TO app;",
        ]
    )
