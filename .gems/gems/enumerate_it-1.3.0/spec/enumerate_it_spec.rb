# encoding: utf-8

require File.expand_path(File.dirname(__FILE__) + '/spec_helper')

describe EnumerateIt do
  before do
    class TestClass
      extend EnumerateIt
      attr_accessor :foobar
      has_enumeration_for :foobar, with: TestEnumeration

      def initialize(foobar)
        @foobar = foobar
      end

      I18n.locale = :en
    end

    @target = TestClass.new(TestEnumeration::VALUE_2)
  end

  context "associating an enumeration with a class attribute" do
    it "creates an humanized description for the attribute's value" do
      expect(@target.foobar_humanize).to eq('Hey, I am 2!')
    end

    it "if the attribute is blank, the humanize description is nil" do
      @target.foobar = nil
      expect(@target.foobar_humanize).to be_nil
    end

    it "defaults to not creating helper methods" do
      expect(@target).not_to respond_to(:value_1?)
    end

    it "stores the enumeration class in a class-level hash" do
      expect(TestClass.enumerations[:foobar]).to eq(TestEnumeration)
    end

    context 'use the same enumeration from an inherited class' do
      before do
        class SomeClassWithoutEnum < BaseClass
        end
        @target = SomeClassWithoutEnum.new
      end

      it 'should have use the correct class' do
        @base = BaseClass.new
        expect(@base.class.enumerations[:foobar]).to eq(TestEnumeration)
        expect(@target.class.enumerations[:foobar]).to eq(TestEnumeration)
      end
    end

    context 'declaring a simple enum on an inherited class' do
      before do
        class SomeClass < BaseClass
          has_enumeration_for :foobar
        end
        @target = SomeClass.new
      end
      it 'should have use the corret class' do
        @base = BaseClass.new
        expect(@base.class.enumerations[:foobar]).to eq(TestEnumeration)
        expect(@target.class.enumerations[:foobar]).to eq(Foobar)
      end
    end

    context "passing the value of each option without the human string (just the value, without an array)" do
      before do
        class TestClassForEnumerationWithoutArray
          extend EnumerateIt
          attr_accessor :foobar
          has_enumeration_for :foobar, with: TestEnumerationWithoutArray

          def initialize(foobar)
            @foobar = foobar
          end
        end

        @target = TestClassForEnumerationWithoutArray.new(TestEnumerationWithoutArray::VALUE_TWO)
      end

      it "humanizes the respective hash key" do
        expect(@target.foobar_humanize).to eq('Value Two')
      end

      it "translates the respective hash key when a translation is found" do
        @target.foobar = TestEnumerationWithoutArray::VALUE_ONE
        expect(@target.foobar_humanize).to eq('First Value')
        I18n.locale = :pt

        expect(@target.foobar_humanize).to eq('Primeiro Valor')
      end
    end

    context "without passing the enumeration class" do
      before do
        class FooBar
          extend EnumerateIt
          attr_accessor :test_enumeration

          has_enumeration_for :test_enumeration

          def initialize(test_enumeration_value)
            @test_enumeration = test_enumeration_value
          end
        end
      end

      it "should find out which enumeration class to use" do
        target = FooBar.new(TestEnumeration::VALUE_1)
        expect(target.test_enumeration_humanize).to eq('Hey, I am 1!')
      end

      context "when using a nested class as the enumeration" do
        before do
          class NestedEnum < EnumerateIt::Base
            associate_values foo: ['1', 'Fooo'], bar: ['2', 'Barrrr']
          end

          class ClassWithNestedEnum
            class NestedEnum < EnumerateIt::Base
              associate_values foo: ['1', 'Blerrgh'], bar: ['2' => 'Blarghhh']
            end

            extend EnumerateIt

            attr_accessor :nested_enum

            has_enumeration_for :nested_enum

            def initialize(nested_enum_value)
              @nested_enum = nested_enum_value
            end
          end
        end

        it "uses the inner class as the enumeration class" do
          expect(ClassWithNestedEnum.new('1').nested_enum_humanize).to eq('Blerrgh')
        end
      end
    end
  end

  context "using the :create_helpers option" do
    before do
      class TestClassWithHelper
        extend EnumerateIt
        attr_accessor :foobar
        has_enumeration_for :foobar, with: TestEnumeration, create_helpers: true

        def initialize(foobar)
          @foobar = foobar
        end
      end
    end

    it "creates helpers methods with question marks for each enumeration option" do
      target = TestClassWithHelper.new(TestEnumeration::VALUE_2)
      expect(target).to be_value_2
      expect(target).not_to be_value_1
    end

    it "creates a mutator method for each enumeration value" do
      [:value_1, :value_2, :value_3].each do |value|
        expect(TestClassWithHelper.new(TestEnumeration::VALUE_1)).to respond_to(:"#{value}!")
      end
    end

    it "changes the attribute's value through mutator methods" do
      target = TestClassWithHelper.new(TestEnumeration::VALUE_2)
      target.value_3!
      expect(target.foobar).to eq(TestEnumeration::VALUE_3)
    end

    context "with :prefix option" do
      before do
        class TestClassWithHelper
          has_enumeration_for :foobar, with: TestEnumeration, create_helpers: { prefix: true }
        end
      end

      it "creates helpers methods with question marks and prefixes for each enumeration option" do
        target = TestClassWithHelper.new(TestEnumeration::VALUE_2)
        expect(target).to be_foobar_value_2
      end

      it "creates a mutator method for each enumeration value" do
        [:value_1, :value_2, :value_3].each do |value|
          expect(TestClassWithHelper.new(TestEnumeration::VALUE_1)).to respond_to(:"foobar_#{value}!")
        end
      end

      it "changes the attribute's value through mutator methods" do
        target = TestClassWithHelper.new(TestEnumeration::VALUE_2)
        target.foobar_value_3!
        expect(target.foobar).to eq(TestEnumeration::VALUE_3)
      end
    end

    context "with :polymorphic option" do
      before do
        class Polymorphic
          extend EnumerateIt
          attr_accessor :foo
          has_enumeration_for :foo, with: PolymorphicEnum, create_helpers: { polymorphic: true }
        end
      end

      it "calls methods on the enum constants' objects" do
        target = Polymorphic.new
        target.foo = PolymorphicEnum::NORMAL

        expect(target.foo_object.print("Gol")).to eq("I'm Normal: Gol")

        target.foo = PolymorphicEnum::CRAZY

        expect(target.foo_object.print("Gol")).to eq("Whoa!: Gol")
      end

      it "returns nil if foo is not set" do
        target = Polymorphic.new

        expect(target.foo_object).to be_nil
      end

      context "and :suffix" do
        before do
          class Polymorphic
            has_enumeration_for :foo, with: PolymorphicEnum, create_helpers: { polymorphic: { suffix: "_strategy" } }
          end
        end

        it "calls methods on the enum constants' objects" do
          target = Polymorphic.new
          target.foo = PolymorphicEnum::NORMAL

          expect(target.foo_strategy.print("Gol")).to eq("I'm Normal: Gol")

          target.foo = PolymorphicEnum::CRAZY

          expect(target.foo_strategy.print("Gol")).to eq("Whoa!: Gol")
        end
      end
    end
  end

  describe "using the :create_scopes option" do
    context "if the hosting class responds to :scope" do
      before do
        if ActiveSupport::VERSION::STRING =~ /3\.1/
          Object.send :remove_const, 'TestClassWithScope' if defined?(TestClassWithScope)
        end

        class TestClassWithScope < ActiveRecord::Base
          extend EnumerateIt
          has_enumeration_for :foobar, with: TestEnumeration, create_scopes: true
        end
      end

      it "creates a scope for each enumeration value" do
        TestEnumeration.enumeration.keys.each do |symbol|
          expect(TestClassWithScope).to respond_to(symbol)
        end
      end

      it "when called, the scopes create the correct query" do
        TestEnumeration.enumeration.each do |symbol, pair|
          expect(TestClassWithScope).to receive(:where).with(foobar: pair.first)
          TestClassWithScope.send symbol
        end
      end
    end

    context "when the hosting class do not respond to :scope" do
      before do
        class GenericClass
          extend EnumerateIt
        end
      end

      it "raises no errors" do
        expect {
          GenericClass.send(:has_enumeration_for, :foobar, with: TestEnumeration, create_scopes: true)
        }.to_not raise_error
      end
    end

    context "with :prefix option" do
      before do
        class OtherTestClass < ActiveRecord::Base
          extend EnumerateIt
          has_enumeration_for :foobar, with: TestEnumerationWithReservedWords, create_scopes: { prefix: true }
        end
      end

      it "creates a scope with prefix for each enumeration value" do
        TestEnumerationWithReservedWords.enumeration.keys.each do |symbol|
          expect(OtherTestClass).to respond_to(:"foobar_#{symbol}")
        end
      end
    end
  end
end
