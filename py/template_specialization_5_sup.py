# support for template_specialization_5
from inspect import currentframe
from typing import *

T = TypeVar('T')

# steal the type of overload
def typeof(x: T) -> Type[T]: ...
__overload_t = typeof(overload)

class OverloadError(SystemError): ...

def overloadable(_: Any) -> None:
   __lookup__ = {}
   def resolve(*args):
      return __lookup__[tuple(args)]
   resolve.__lookup__ = __lookup__
   resolve.__is_overloadable__ = True
   return resolve

def overload(args: Any, ret: Any) -> __overload_t:
   def decorate(fn: Callable):
      try:
         resolver = currentframe().f_back.f_locals[fn.__name__]
         getattr(resolver, "__is_overloadable__")
         resolver.__lookup__[tuple(args)] = ret
         return resolver
      except:
         raise OverloadError(f"Could not overload {fn.__name__}!")
   return decorate
