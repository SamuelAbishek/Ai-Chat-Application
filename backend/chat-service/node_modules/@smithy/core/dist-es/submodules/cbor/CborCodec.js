import { SerdeContext } from "@smithy/core/protocols";
import { CborShapeSerializer } from "./codec-v1/CborShapeSerializer";
import { CborShapeDeserializer } from "./codec-v1/CborShapeDeserializer";
export class CborCodec extends SerdeContext {
    createSerializer() {
        const serializer = new CborShapeSerializer();
        serializer.setSerdeContext(this.serdeContext);
        return serializer;
    }
    createDeserializer() {
        const deserializer = new CborShapeDeserializer();
        deserializer.setSerdeContext(this.serdeContext);
        return deserializer;
    }
}
