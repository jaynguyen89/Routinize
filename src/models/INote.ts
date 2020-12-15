import IThing from "./IThing";
import INoteSegment from "./INoteSegment";

interface INote extends IThing {
    segments : Array<INoteSegment> | null
}

export default INote;
