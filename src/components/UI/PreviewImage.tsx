
function PreviewImage({ file }: any) {

  return (
    <div className="flex justify-center">{<img src={URL.createObjectURL(file)} alt={'preview'} width='200px' height='200px'/>}</div>
  );
}

export default PreviewImage;
