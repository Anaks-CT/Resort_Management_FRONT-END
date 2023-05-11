
function PreviewImage({ file, freeStyle, className, roomCustomize }: any) {
  if(freeStyle) {
    return (
      <img className={`object-cover rounded-full ${className}`} src={URL.createObjectURL(file)} alt={'preview'} />
    )
  }

  if(roomCustomize){
    return <img className={`w-full h-full ${className}`} src={URL.createObjectURL(file)} alt={'preview'} />
  }

  return (
    <div className="flex justify-center">{<img  src={URL.createObjectURL(file)} alt={'preview'} width='200px' height='200px'/>}</div>
  );
}

export default PreviewImage;
