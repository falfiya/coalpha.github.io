export type is<a, b> = a extends b ? b extends a ? true : false : false;
export type enable_if<b extends boolean, T> = b extends true ? {type: T} : {type: number};
export type enable_if_t<b extends boolean, T> = enable_if<b, T>["type"]
export type extend<T, U> = T extends U ? true : false;
export type not<T> = T extends true ? false : true;
export type $extends<parent, child> = child extends parent ? true : false;
declare const unsatisfiable: unique symbol;
export type satisfies<T> = T extends true ? never : typeof unsatisfiable;
export type $key = keyof any;
export type uniq<ary extends readonly [...any[]], seen = never> =
   ary extends readonly []
   ? true
   : ary extends readonly [infer head, ...infer tail]
      ? head extends seen
         // has it been seen? then it's not unique
         ? false
         // else, next element
         : uniq<tail, seen | head>
      : never;

/// only string and number now
export type is_narrow<val> =
   val extends string
      ? string extends val
         ? false
         : true
      : val extends number
         ? number extends val
            ? false
            : true
            : false;
