import json


def GetParam(dict, id, required=False, default=None):
    if id not in dict or not dict[id]:
        if required:
            raise ValueError('parameter "%s" not found in list.' % id)
        else:
            return default
    else:
        return dict[id]

def GetString(dict, id, required=False, default=None):
    return str(GetParam(dict, id, required, default))

def GetJson(dict, id, required=False, default=None):
    string_value = GetString(dict, id, required, default)

    if string_value:
        return json.loads(string_value)
    else:
        return None

def GetInt(dict, id, required=False, default=None):
    string_value = GetString(dict, id, required, default)

    if string_value:
        return int(string_value)
    else:
        return None

def GetFloat(dict, id, required=False, default=None):
    string_value = GetString(dict, id, required, default)

    if string_value:
        return float(string_value)
    else:
        return None
