# ucsdflyers
Download <a href="https://www.vagrantup.com/">vagrant</a> and <a href="https://www.virtualbox.org/wiki/Downloads">virtualbox</a> Then run the following command
```
mkdir esl-cse110
cd esl-cse110
vagrant init jogu/nodeBase
```
You now should have a file called "Vagrantfile." Make sure your file contains these two lines with the config
```
config.vm.box = "jogu/nodeBase" 
config.vm.network "forwarded_port", guest: 80, host: 8080, auto_correct: true  
```
Now you should be able to run 
```
vagrant up --provider virtualbox
vagrant ssh
```
If vagrant asks you for password in this process, the password should be 'vagrant'.<br/>
Now run the following commands
```
cd ~/share
git clone git@github.com:xiqianglin/ucsdflyers.git
```
