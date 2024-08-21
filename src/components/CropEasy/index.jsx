import Cropper from "react-easy-crop";
import RangeSlider from "./RangeSlider";

const CropEasy = ({
  image = "",
  crop,
  rotation,
  zoom,
  zoomSpeed = 4,
  maxZoom = 3,
  zoomWithScroll = true,
  showGrid = true,
  aspect = 1 / 1,
  onCropChange,
  onZoomChange,
  onRotationChange,
  onCropComplete,
  ...props
}) => {
  return (
    <section className="mb-10">
      <div className="relative h-[300px] bg-foreground mb-4">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          zoomSpeed={zoomSpeed}
          maxZoom={maxZoom}
          zoomWithScroll={zoomWithScroll}
          showGrid={showGrid}
          aspect={aspect}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onRotationChange={onRotationChange}
          onCropComplete={onCropComplete}
          {...props}
        />
      </div>
      <div className="px-5">
        <RangeSlider
          name="Zoom"
          min={1}
          max={100}
          value={zoom}
          onChange={(newValue) => onZoomChange(newValue)}
          symbol="%"
        />
        <RangeSlider
          name="Rotation"
          min={0}
          max={360}
          defaultValue={0}
          marks={{ 0: 0, 90: 90, 180: 180, 270: 270, 360: 360 }}
          step={null}
          value={rotation}
          onChange={(newValue) => onRotationChange(newValue)}
          symbol="°"
        />
      </div>
    </section>
  );
};
export default CropEasy;
