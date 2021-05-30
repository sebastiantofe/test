#!/bin/bash
createdb -T template0 test
cd ../db
psql -U postgres -d test < test-dump.sql