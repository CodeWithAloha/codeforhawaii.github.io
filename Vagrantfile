# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.require_version ">= 1.7.2"

Vagrant.configure(2) do |config|

  config.vm.box = "ubuntu/trusty64"
  config.vm.box_check_update = false

  config.vm.define "hicapacity_vm"
  config.vm.hostname = 'hicapacity.local'

  config.vm.provider "virtualbox" do |vm|
    vm.name = "hicapacity_vm"
  end

  config.vm.network "forwarded_port", guest: 4000, host: 4000, auto_correct: true

  config.vm.provision :shell,
    :privileged => true,
    :inline => "sudo apt-get install ruby ruby-dev make gcc nodejs && gem install jekyll rdiscount --no-ri --no-rdoc"

  config.vm.provision :shell,
    :run => "always",
    :privileged => false,
    :inline => "cd /vagrant && screen -S jekyll -d -m jekyll serve -P 4000 --host 0.0.0.0 --watch --force_polling"
end


