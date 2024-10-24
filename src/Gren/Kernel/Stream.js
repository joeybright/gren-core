/*

import Stream exposing (Locked, Closed)
import Gren.Kernel.Scheduler exposing (binding, succeed, fail, rawSpawn)

*/

var _Stream_read = function (stream) {
  return __Scheduler_binding(function (callback) {
    if (stream.locked) {
      return callback(__Scheduler_fail(__Stream_Locked));
    }

    const reader = stream.getReader();
    reader
      .read()
      .then(({ done, value }) => {
        if (value instanceof Uint8Array) {
          value = new DataView(
            value.buffer,
            value.byteOffset,
            value.byteLength,
          );
        }

        callback(
          __Scheduler_succeed({ __$streamClosed: done, __$value: value }),
        );
      })
      .catch((err) => {
        console.log("ReadableStream err: ", err);
        return callback(__Scheduler_fail(__Stream_Closed));
      })
      .finally(() => {
        reader.releaseLock();
      });
  });
};

var _Stream_write = F2(function (value, stream) {
  return __Scheduler_binding(function (callback) {
    if (stream.locked) {
      return callback(__Scheduler_fail(__Stream_Locked));
    }

    if (value instanceof DataView) {
      value = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
    }

    const writer = stream.getWriter();
    writer
      .write(value)
      .then(() => {
        callback(__Scheduler_succeed({}));
      })
      .catch((err) => {
        console.log("WriteableStream err: ", err);
        return callback(__Scheduler_fail(__Stream_Closed));
      })
      .finally(() => {
        writer.releaseLock();
      });
  });
});

var _Stream_pipeThrough = F2(function (transformer, readable) {
  return __Scheduler_binding(function (callback) {
    const transformedReader = readable.pipeThrough(transformer);
    return callback(__Scheduler_succeed(transformedReader));
  });
});

var _Stream_pipeTo = F2(function (writable, readable) {
  return __Scheduler_binding(function (callback) {
    readable.pipeTo(writable);
    return callback(__Scheduler_succeed({}));
  });
});

var _Stream_makeIdentityTransformation = F2(
  function (readCapacity, writeCapacity) {
    return __Scheduler_binding(function (callback) {
      const transformStream = new TransformStream(
        {},
        new CountQueuingStrategy({ highWaterMark: writeCapacity }),
        new CountQueuingStrategy({ highWaterMark: readCapacity }),
      );

      return callback(__Scheduler_succeed(transformStream));
    });
  },
);

var _Stream_readable = function (transformStream) {
  return transformStream.readable;
};

var _Stream_writable = function (transformStream) {
  return transformStream.writable;
};
