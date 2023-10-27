import React, {useState} from "react";
import {ConfigType} from "../../../designer/right/ConfigType";
import BaseImage from "./BaseImage";
import './BaseImageConfig.less';
import ImageCache from "../../../framework/cache/ImageCache";

export const BaseImageStyleConfig: React.FC<ConfigType<BaseImage>> = ({controller}) => {
    const {style} = controller.getConfig()!;
    const [type, setType] = useState(style?.type || 'online');
    const [localUrl, setLocalUrl] = useState(style?.localUrl || '');
    const fileInfo = {
        uid: '-1',
        name: 'image.png',
        status: 'done',
    }
    const [/*fileList*/, setFileList] = useState((type === 'local' && localUrl !== '' ? [{
        ...fileInfo,
        url: localUrl
    }] : []));

    const fileHash = async (file: File) => {
        const buffer = await file.arrayBuffer();
        const hashArray = await crypto.subtle.digest('SHA-256', buffer);
        const hashCode = Array.from(new Uint8Array(hashArray))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
        return hashCode;
    }

    const beforeUpload = (file: any) => {
        fileHash(file).then((hashCode) => {
            if (ImageCache.isExistImageCache(hashCode)) {
                const url = ImageCache.getImageCache(hashCode);
                controller.update({style: {localUrl: url!, hashCode}});
                setLocalUrl(url!);
                setFileList([{...fileInfo, url: url!}]);
            } else {
                const fileReader = new FileReader();
                fileReader.onload = (event: ProgressEvent<FileReader>) => {
                    const blob = new Blob([event.target!.result!], {type: file.type});
                    const url = URL.createObjectURL(blob);
                    controller.update({style: {localUrl: url, hashCode}});
                    setLocalUrl(url);
                    setFileList([{...fileInfo, url}]);
                    //设置图片缓存
                    ImageCache.addImageCache(hashCode, url);
                    //todo 更换图片的时候要释放链接和内存的关联，可以提高部分性能
                    // URL.revokeObjectURL(bgImgUrl);
                };
                //通过二进制流读取文件，读取完毕后会调用上方设置好的onload事件
                fileReader.readAsArrayBuffer(file);
            }

        });
        return false;
    }

    return (
        <div className={"base-image-style-config"}>
            {/*<ConfigItem title={'图片来源'}>*/}
            {/*    <Select options={[*/}
            {/*        {label: '在线', value: 'online'},*/}
            {/*        {label: '本地', value: 'local'}*/}
            {/*    ]} defaultValue={type} onChange={(value => {*/}
            {/*        setType(value as 'online' | 'local');*/}
            {/*        controller.update({style: {type: value as BaseImageComponentStyle['type']}})*/}
            {/*    })}/>*/}
            {/*</ConfigItem>*/}
            {/*{type === 'online' && <ConfigItem title={'图片链接'} contentStyle={{width: '80%'}}>*/}
            {/*    <UnderLineInput type={"url"} defaultValue={style?.onLineUrl || ''}*/}
            {/*                    onChange={(event) => controller.update({style: {onLineUrl: event.target.value}})}/>*/}
            {/*</ConfigItem>}*/}
            {/*{type === 'local' &&*/}
            {/*<ConfigItem title={'上传图片'} contentStyle={{width: '80%'}} itemStyle={{alignItems: "flex-start"}}>*/}
            {/*    <Upload name={'file'} beforeUpload={beforeUpload} listType={'picture-card'}*/}
            {/*            fileList={fileList as Array<UploadFile>}*/}
            {/*            onRemove={() => {*/}
            {/*                setFileList([]);*/}
            {/*                setLocalUrl('');*/}
            {/*                controller.update({style: {localUrl: ''}})*/}
            {/*                //todo 后续要加上定时清理缓存*/}
            {/*            }}*/}
            {/*            onPreview={() => window.open(localUrl)}>*/}
            {/*        {fileList.length > 0 ? null : <div className={'upload-btn'}>*/}
            {/*            <PlusOutlined/>*/}
            {/*            <div style={{marginTop: 8}}>Upload</div>*/}
            {/*        </div>}*/}
            {/*    </Upload>*/}
            {/*</ConfigItem>}*/}
        </div>
    )
}
