import Note from "../models/note.js"

export async function fetchNotes  (_,res)  {
    try {
        const notes = await Note.find().sort({createdAt: -1}); //newest first.. stack structure.
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in Fetching notes", error);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export async function fetchNotesByID  (req,res)  {
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message:"Note not found"});
        res.json(note);
    } catch (error) {
        console.error("Error in Fetching notes by id")
    }
};


export async function createNotes  (req,res)  {
    try{
        const {title,content} = req.body;
        const note = new Note({title,content});
        const savedNote = await note.save();
        res.status(200).json(savedNote);
    } catch (error) {  
         console.error("Error in creating notes", error);
        res.status(500).json({message:"Internal Server Error"});
    }

};

export async function updateNotes(req,res)  {
    try{
        const {title,content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id, 
            {title,content},
            {
                new: true,
            });
        if(!updatedNote) return res.status(404).json({message:"Note not found"});
        
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updating notes", error);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export async function deleteNotes  (req,res)  {
    try{
        const {title,content} = req.body;
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        req.params.id,
        {title,content},
        {
            new: true,
        }
        
        if(!deletedNote) return res.status(404).json({message:"Note not found"});
        
        res.status(200).json("Note deleted successfully");
    } catch (error) {
        console.error("Error in deleting notes", error);
        res.status(500).json({message:"Internal Server Error"});
    
    }
};