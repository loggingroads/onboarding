# encoding: utf-8

require 'active_support/core_ext/class/attribute'
require 'enumerate_it/base'
require 'enumerate_it/class_methods'

module EnumerateIt
  def self.extended(receiver)
    receiver.class_attribute :enumerations, instance_writer: false, instance_reader: false
    receiver.enumerations = {}

    receiver.extend ClassMethods
  end
end
