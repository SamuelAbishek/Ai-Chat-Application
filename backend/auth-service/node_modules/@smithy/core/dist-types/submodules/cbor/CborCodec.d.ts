import { SerdeContext } from "@smithy/core/protocols";
import type { Codec } from "@smithy/types";
import { CborShapeSerializer } from "./codec-v1/CborShapeSerializer";
import { CborShapeDeserializer } from "./codec-v1/CborShapeDeserializer";
/**
 * @public
 */
export declare class CborCodec extends SerdeContext implements Codec<Uint8Array, Uint8Array> {
    createSerializer(): CborShapeSerializer;
    createDeserializer(): CborShapeDeserializer;
}
