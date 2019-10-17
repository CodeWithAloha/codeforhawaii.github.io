# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.require_version ">= 1.7.2"

Vagrant.configure(2) do |config|

  config.vm.box = "ubuntu/disco64"
  config.vm.box_check_update = false

  config.vm.define "cfh-www-vm"
  config.vm.hostname = 'cfh-www.local'
  config.vm.boot_timeout = 600

  config.vm.provider "virtualbox" do |vm|
    vm.name = "cfh-www-vm"
  end

  config.vm.network "forwarded_port", guest: 4000, host: 4000, auto_correct: true

  config.vm.provision :shell,
    :privileged => true,
    :inline => "sudo apt-get --allow-releaseinfo-change update && apt-get install -y ruby ruby-dev ruby-bundler make gcc nodejs zlib1g-dev zlib1g "

  config.vm.provision :shell,
    :run => "always",
    :privileged => false,
    :inline => "cd /vagrant && bundle install && screen -d -m bash -c '/usr/local/bin/jekyll serve --host 0.0.0.0 --watch -P 4000 --incremental --force_polling'"
end


