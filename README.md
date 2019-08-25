# Modem Rebooter (NodeJS)

I updated the firmware in my TL-MR3420 and a cmd (
```
curl -H "Referer: http://192.168.0.1/userRpm/SysRebootRpm.htm" -H "Authorization:Basic YW1bpxmkYTphbWlubGRh" http://192.168.0.1/userRpm/SysRebootRpm.htm?Reboot=Reboot
```
) stopped working.
So I decided to use selenium, but because there are frames there and it doesn't to get through.
I used wireshark to study what is happening and in the end it turned out...:)