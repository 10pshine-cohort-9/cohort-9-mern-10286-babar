import Editor, { 
  Toolbar, 
  BtnBold, 
  BtnItalic, 
  BtnUnderline, 
  BtnStrikeThrough, 
  BtnLink, 
  BtnBulletList, 
  BtnNumberedList, 
  BtnClearFormatting,
  createButton 
} from 'react-simple-wysiwyg';

// Custom alignment buttons
const BtnAlignLeft = createButton('Align left', '⬅', 'justifyLeft');
const BtnAlignCenter = createButton('Align center', '≡', 'justifyCenter');
const BtnAlignRight = createButton('Align right', '➡', 'justifyRight');

function NoteForm({
  formData,
  onChange,
  onSubmit,
  loading,
  submitText = "Save Note",
}) {
  const handleEditorChange = (e, fieldName) => {
    onChange({
      target: {
        name: fieldName,
        value: e.target.value
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      
      {/* Note Title Rich Text Editor */}
      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-2">Note Title & Formatting</label>
        <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-teal-500 transition-all">
          <Editor
            value={formData.title}
            onChange={(e) => handleEditorChange(e, 'title')}
            disabled={loading}
            containerProps={{ style: { minHeight: '90px', border: 'none', padding: '12px' } }}
          >
            <Toolbar>
              <BtnBold />
              <BtnItalic />
              <BtnUnderline />
              <BtnStrikeThrough />
              <BtnClearFormatting />
            </Toolbar>
          </Editor>
        </div>
      </div>

      {/* Note Content Rich Text Editor */}
      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-2">Note Content & Rich Formatting</label>
        <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-teal-500 transition-all">
          <Editor
            value={formData.content}
            onChange={(e) => handleEditorChange(e, 'content')}
            disabled={loading}
            containerProps={{ style: { minHeight: '280px', border: 'none', padding: '16px' } }}
          >
            <Toolbar>
              <BtnBold />
              <BtnItalic />
              <BtnUnderline />
              <BtnStrikeThrough />
              <BtnBulletList />
              <BtnNumberedList />
              <BtnLink />
              <BtnAlignLeft />
              <BtnAlignCenter />
              <BtnAlignRight />
              <BtnClearFormatting />
            </Toolbar>
          </Editor>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-teal-600/25"
        >
          {loading ? 'Saving...' : submitText}
        </button>
      </div>
    </form>
  );
}

export default NoteForm;