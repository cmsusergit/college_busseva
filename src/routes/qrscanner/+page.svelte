<script>
    import { page } from '$app/stores'

    import {Html5QrcodeScanner,Html5QrcodeScanType} from "html5-qrcode"
    import { onMount } from 'svelte';
    const onScanSuccess=(decodedText, decodedResult)=>{
        console.log(`Code matched = ${decodedText}`, decodedResult);
    }
    const onScanFailure=(error)=>{
        console.log('****',error)
    }
    let config = {
        fps: 10,
        qrbox: {width: 100, height: 100},
        rememberLastUsedCamera: true,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
    };
    onMount(()=>{
        console.log('****');
        let html5QrcodeScanner = new Html5QrcodeScanner("reader", config,false);
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);
        
})
</script>
<div>
    <div id="reader"/>
</div>