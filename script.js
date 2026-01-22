function calculateSubnet() {
    const ip = document.getElementById("ip").value;
    const cidr = parseInt(document.getElementById("cidr").value);
    const result = document.getElementById("result");

    if (!ip || cidr < 1 || cidr > 30) {
        result.innerHTML = "❌ Invalid Input";
        return;
    }

    const ipParts = ip.split('.').map(Number);
    if (ipParts.length !== 4) {
        result.innerHTML = "❌ Invalid IP Address";
        return;
    }

    let ipBinary = ipParts.map(octet =>
        octet.toString(2).padStart(8, '0')
    ).join('');

    let networkBinary = ipBinary.substring(0, cidr) +
        '0'.repeat(32 - cidr);
    let broadcastBinary = ipBinary.substring(0, cidr) +
        '1'.repeat(32 - cidr);

    function binaryToIP(binary) {
        let ip = [];
        for (let i = 0; i < 32; i += 8) {
            ip.push(parseInt(binary.substring(i, i + 8), 2));
        }
        return ip.join('.');
    }

    const networkAddress = binaryToIP(networkBinary);
    const broadcastAddress = binaryToIP(broadcastBinary);

    let hostBits = 32 - cidr;
    let totalHosts = Math.pow(2, hostBits) - 2;

    let firstHostBinary = networkBinary.substring(0, 31) + '1';
    let lastHostBinary = broadcastBinary.substring(0, 31) + '0';

    const firstHost = binaryToIP(firstHostBinary);
    const lastHost = binaryToIP(lastHostBinary);

    result.innerHTML = `
        <p><strong>Network Address:</strong> ${networkAddress}</p>
        <p><strong>Broadcast Address:</strong> ${broadcastAddress}</p>
        <p><strong>First Host:</strong> ${firstHost}</p>
        <p><strong>Last Host:</strong> ${lastHost}</p>
        <p><strong>Total Hosts:</strong> ${totalHosts}</p>
        <p><strong>Subnet Mask:</strong> /${cidr}</p>
        <hr>
        <p><strong>Subnet Visualization</strong></p>
        <p>${networkAddress} ─────────── ${broadcastAddress}</p>
    `;
    // document.getElementById("ip").value = '';
    // document.getElementById("cidr").value = '';
}
