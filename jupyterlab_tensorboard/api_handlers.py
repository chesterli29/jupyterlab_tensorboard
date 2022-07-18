# -*- coding: utf-8 -*-
# Copyright (c) 2017-2019, Shengpeng Liu.  All rights reserved.
# Copyright (c) 2020-2021, NVIDIA CORPORATION. All rights reserved.
# Copyright (c) 2022, Thijs Walcarius

import json
import os

from tornado import web
from notebook.base.handlers import APIHandler



def _trim_notebook_dir(dir, notebook_dir):
    if not dir.startswith("/"):
        return os.path.join(
            "<notebook_dir>", os.path.relpath(dir, notebook_dir)
        )
    return dir


class TbRootHandler(APIHandler):
    
    def initialize(self, notebook_dir):
        self.notebook_dir = notebook_dir

    @web.authenticated
    def get(self):
        terms = [
            {
                'name': entry.name,
                'logdir': _trim_notebook_dir(entry.logdir, self.notebook_dir),
            } for entry in
            self.settings["tensorboard_manager"].values()
        ]
        self.finish(json.dumps(terms))

    @web.authenticated
    def post(self):
        data = self.get_json_body()
        reload_interval = data.get("reload_interval", None)
        entry = (
            self.settings["tensorboard_manager"]
            .new_instance(data["logdir"], reload_interval=reload_interval)
        )
        self.finish(json.dumps({
                'name': entry.name,
                'logdir':  _trim_notebook_dir(entry.logdir, self.notebook_dir),
                }))


class TbInstanceHandler(APIHandler):

    SUPPORTED_METHODS = ('GET', 'DELETE')
    
    
    def initialize(self, notebook_dir):
        self.notebook_dir = notebook_dir

    @web.authenticated
    def get(self, name):
        manager = self.settings["tensorboard_manager"]
        if name in manager:
            entry = manager[name]
            self.finish(json.dumps({
                'name': entry.name,
                'logdir':  _trim_notebook_dir(entry.logdir, self.notebook_dir),
                }))
        else:
            raise web.HTTPError(
                404, "TensorBoard instance not found: %r" % name)

    @web.authenticated
    def delete(self, name):
        manager = self.settings["tensorboard_manager"]
        if name in manager:
            manager.terminate(name, force=True)
            self.set_status(204)
            self.finish()
        else:
            raise web.HTTPError(
                404, "TensorBoard instance not found: %r" % name)
