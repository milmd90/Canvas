// Animation action
function cameraRotate(v){
    var cosX = Math.cos(CameraRot.x * pi);
    var cosY = Math.cos(CameraRot.y * pi);
    var cosZ = Math.cos(CameraRot.z * pi);
    var sinX = Math.sin(CameraRot.x * pi);
    var sinY = Math.sin(CameraRot.y * pi);
    var sinZ = Math.sin(CameraRot.z * pi);

    var Temp = v.z;
    v.z = -v.x * sinY - v.z * cosY;
    v.x = -v.x * cosY + Temp * sinY;

    Temp = v.z;
    v.z = -v.y * sinX + v.z * cosX;
    v.y = v.y * cosX + Temp * sinX;

    Temp = v.x;
    v.x = v.x * cosZ - v.y * sinZ;
    v.y = v.y * cosZ + Temp * sinZ;

    // Apply camera translation
    v.x -= CameraPos.x;
    v.y -= CameraPos.y;
    v.z -= CameraPos.z;
    return v;
}
