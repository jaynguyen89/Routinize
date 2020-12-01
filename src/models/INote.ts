import IThing from "./IThing";
import INoteSegment from "./INoteSegment";

interface INote extends IThing {
    id : number,
    segments : Array<INoteSegment>
}

export default INote;
