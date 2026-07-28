import { SerdeContext } from "@smithy/core/protocols";
import { Schema, ShapeSerializer } from "@smithy/types";
/**
 * Single-pass CBOR serializer that walks the Smithy schema and writes CBOR bytes
 * directly to a module-level buffer in one traversal. Eliminates the intermediate
 * JS object tree that the multi-pass CborShapeSerializer builds.
 *
 * @internal
 */
export declare class SinglePassCborShapeSerializer extends SerdeContext implements ShapeSerializer<Uint8Array> {
    constructor();
    write(schema: Schema, value: unknown): void;
    flush(): Uint8Array;
}
/**
 * Advance the encoding epoch. Call between serialization batches
 * to allow stale cache entries to be evicted.
 *
 * @internal
 */
export declare function advanceSinglePassEncodingEpoch(): void;
export declare function activateCborStructIterator(): void;
