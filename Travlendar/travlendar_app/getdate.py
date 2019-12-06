from tzlocal import get_localzone
from datetime import datetime

local = get_localzone()

dt = str(datetime.now(local))

DATE = dt.split(" ")[0]

TIME = dt.split(" ")[1].split(".")[0]