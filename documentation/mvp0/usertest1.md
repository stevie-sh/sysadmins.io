##First User Test

###Kind of customer:
Junior System administrator customer segment -- developer. 

LEVEL 3 Tech


##Description:
Ticket: Problem: I set up a cron job to run daily, but it doesn't appear to be running. The cron job calls a nodejs script which generates a json file for a web app.

###Chat Transcript:
Hey,
I'm interested in that beta testing opportunity you just posted.
Stephen
Awesome! Thanks for contacting me so fast
So you have a problem with deployment of an app or something similar?
Or sorry if I'm rushing you -- Shoot me any questions about the testing if you would like.

Abhimanyu
Yeah, actually. I can probably solve this myself with a bit of research, but I might as well help you guys out.
Stephen
Seriously appreciate that

Abhimanyu
So I set up a cron job on my ubuntu server to run daily, but I don't think its running.
Stephen
awesome
this is exactly the kind of thing we hope to help with
so if you don't mind
going onto www.sysadmins.io
signing up  and submitting a ticket
do you have a skype id by any changce?

Abhimanyu
Gotcha. Doing it now.
Stephen
or a phone number i can contact you
i promise it will tkae less than 5 minutes total

Abhimanyu
I prefer to use google hangouts, if that's okay with you. I'm not in a place where I can talk on the phone, though.
abhikdeora@gmail.com
Stephen
of course
awesome okay so just submit the ticket
and try to navigate through the process

Abhimanyu
Just submitted one.
A bit of feedback: when you create an account, its not immediately obvious that it went through - nothing much changes.
Stephen
got your ticket -- great! noted
so typically you would either go onto skype or use our chatapp that's coming soon
but since we're on FB we can stay here and
just treat me like im your system administrator

Abhimanyu
Gotcha.
So, I put a shell script in /etc/cron.daily.
The shell script CDs to a directory with a nodejs program and runs that program.
And I grepped for CRON in /var/log/syslog, but I'm not seeing that shell script in that output.
Stephen
Awesome. Hi Abhimanyu, got your ticket. So you said you set up a cron job and you put it in your etc/cron.daily . Do
So it seems like your script isn't running if it's not logigng into syslog

Abhimanyu
Yeah that was my thought exactly.
Stephen
can you check if the cron daemon is running:

$ ps aux | grep cron

Abhimanyu
root       833  0.0  0.0  23656   496 ?        Ss   May24   0:23 cron
goldage5 29197  0.0  0.1  11740   940 pts/0    S+   17:48   0:00 grep --color=auto cron
That was the output.
Sorry for the bad formatting.
Stephen
No problem.
Do you mind showing me what is within your crontab?

Abhimanyu
I ran
$ crontab -e
And it just opened up a blank file in nano with some isntructions commented out.
Stephen
Give me a moment to research please.

Abhimanyu
If it helps, here is the contents of the shell script I placed in /etc/cron.daily:

#!/bin/bash
cd /var/www/html/projects/UChicagoDiningApp/ChicagoDiningScraper
nodejs cathey.js
Stephen
Great! That's helpful. Do you mind running
$which nodejs

Abhimanyu
output is:
/usr/bin/nodejs
The shell script runs when I manually run it, so I know that it works.
Stephen
Ah okay.
Do you mind outputting your etc/cron.daily here?

Abhimanyu
Its a directory, so I LSed in it.
apache2  apport  apt  aptitude  bsdmainutils  dpkg  logrotate  man-db  mlocate  passwd  popularity-contest  runChicagoScraper.sh  update-notifier-common  upstart
runUChicagoScraper.sh is what I'd like to run.
Stephen
Based on the fact that the logs show no cronjobs running
I believe your crontab may not be executing the etc/cron.daily & hourly scripts

Abhimanyu
Solution?
Stephen
You can run this
$sudo run-parts --report --test /etc/cron.daily
to test whether or not cron.daily is running

Abhimanyu
/etc/cron.daily/apache2
/etc/cron.daily/apport
/etc/cron.daily/apt
/etc/cron.daily/aptitude
/etc/cron.daily/bsdmainutils
/etc/cron.daily/dpkg
/etc/cron.daily/logrotate
/etc/cron.daily/man-db
/etc/cron.daily/mlocate
/etc/cron.daily/passwd
/etc/cron.daily/popularity-contest
/etc/cron.daily/update-notifier-common
/etc/cron.daily/upstart

Abhimanyu
^ that was the output
Stephen
I believe your permissions my be at fault here.
Is there any difference in permissions and ownerships
when you run
$ls -la within your /etc/cron.daily?

Abhimanyu
No everything is root and -rwxr-xr-x

Abhimanyu
total 80
drwxr-xr-x  2 root root  4096 Aug 11 14:21 .
drwxr-xr-x 96 root root  4096 Aug 11 13:59 ..
-rwxr-xr-x  1 root root   625 Jul 22  2014 apache2
-rwxr-xr-x  1 root root   376 Apr  4  2014 apport
-rwxr-xr-x  1 root root 15481 Apr 10  2014 apt
-rwxr-xr-x  1 root root   314 Feb 17  2014 aptitude
-rwxr-xr-x  1 root root   355 Jun  4  2013 bsdmainutils
-rwxr-xr-x  1 root root   256 Mar  7  2014 dpkg
-rwxr-xr-x  1 root root   372 Jan 22  2014 logrotate
-rwxr-xr-x  1 root root  1261 Apr 10  2014 man-db
-rwxr-xr-x  1 root root   435 Jun 20  2013 mlocate
-rwxr-xr-x  1 root root   249 Feb 16  2014 passwd
-rw-r--r--  1 root root   102 Feb  9  2013 .placeholder
-rwxr-xr-x  1 root root  2417 May 13  2013 popularity-contest
-rwxr-xr-x  1 root root   103 Aug 11 14:21 runChicagoScraper.sh
-rwxr-xr-x  1 root root   214 Apr  9  2014 update-notifier-common
-rwxr-xr-x  1 root root   328 Jul 18  2014 upstart
Stephen
Ah
I believe I have it.
rename runChicagoScraper without the .sh extension
then try running the test command I had given prior

Abhimanyu
Ah that would make sense.

Abhimanyu
/etc/cron.daily/apache2
/etc/cron.daily/apport
/etc/cron.daily/apt
/etc/cron.daily/aptitude
/etc/cron.daily/bsdmainutils
/etc/cron.daily/dpkg
/etc/cron.daily/logrotate
/etc/cron.daily/man-db
/etc/cron.daily/mlocate
/etc/cron.daily/passwd
/etc/cron.daily/popularity-contest
/etc/cron.daily/runChicagoScraper
/etc/cron.daily/update-notifier-common
/etc/cron.daily/upstart

Abhimanyu
Yeah so now it shows up.
Stephen
Great! grin emoticon

Abhimanyu
So I guess I won't know until tomorrow if that completely resolved it, but I think that should have fixed it.
Thanks a lot, man!
Stephen
Let me know if you have any more problems related to this ticket in the upcoming 3 days and I'd be glad to help you out with this (free of charge wink emoticon )
Additionally you may already know this but
you can set it to run immediately by using the crontab -e
and specifiying a specific time to run -- for example just to test out you can specify it to run the next minute
However, based on the fact that you already tested out the script I'm sure it will be just fine.

Abhimanyu
Yeah I knew that. I just decided to put it in cron.daily because it doesn't matter when it runs as long as it runs once a day.
Stephen
Smart.

Abhimanyu
Thanks again!
A bit of feedback:
Stephen
Great abhimanyu thanks for participating

Abhimanyu
During a lot of the pauses, it felt like you were just googling. Maybe its that I know how much googling is a part of programming/sys admin stuff, but that's how it felt.
Stephen
Hahah yes very true
When you have time do you mind if we chat for a couple minutes?
Anytime that's convenient to you
Also can I send you $10 via Venmo?
Or whatever your preferred method is

Abhimanyu
Does PayPal work for you?
Stephen
yes

Abhimanyu
Great! My paypal email is abhikdeora@gmail.com.
I'll probably be free to chat via hangouts/skype/phone in an hour or so, if that's fine with you.
Stephen
grin emoticon So when are you available to chat? I promise it will be short. It's just to gain a little more insight to the overall experience and to ask a couple hypotheticals

Abhimanyu
(See above)
Stephen
Does 8:00 Work for you? Sorry, I have to run out at that time.


##FEEDBACK:
	1.Would you use the service again?
		A. Without a doubt. Definitely.
	2. Would you give me access?
		A. Yes, backups are often performed, so not too worried about attacks.
		A. SSH Keys can be set to expire. Was thinking about giving me an SSH key, though it did not match the ticket scenario here.
	3. Relaxed with tickets? How was the chat ujsage?
		A. Chat felt personal and great. Solution to reduce chat intensity seems to be to allow SSH access.
		SH: There was a large strain on me and high pressure to fix the tickets under a time constraint. Perhaps looking for a mixture of
			chatting and emailing is the type of experience we want. Leisurely but on-demand. This seems to be the best case scenario.
	4. Of voice, screenshare, chat, video, email -- which is the preferred method of communication for you? Would you screenshare?
		A. Chat and then email.
		A. Screenshare doesnt seem to offer much benefit in my scenario.
	5. How much would you pay on a ticket basis?
		A. $4.99 seems very fair.
	6. On a monthly basis?
		A. The subscription model doesn't seem to attract me very much even if it included multiple tickets and hours.
	7. Video Explanations? Did you want them?
		A. Yes they would be useful and might pay for them.
	8. Turn-over time expectations?
		A. Anything above 2 hours would annoy me.
	9. Other notes:
		A. Please include a way to get access to servers securely and easily. Love what you're doing here. Would definitely use it again.
	10. Freemium + Transparency model interest?
		A. Interested

Notes from SH:
- Very strained environment with real-time chat. Unlikely scalable unless the expectations are lowered for response times.
- Note that this was more of a FIX MY BUG scenario.'
- We can find a way to make SSH keys expire or disappear - snapchat like use case for ssh keys for better security




	

		
