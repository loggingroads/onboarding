# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160712212503) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "campaigns", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "name"
    t.string   "htag"
    t.text     "description"
    t.string   "background_image"
    t.string   "url"
    t.integer  "status"
    t.date     "start_date"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.string   "background_image_file_name"
    t.string   "background_image_content_type"
    t.integer  "background_image_file_size"
    t.datetime "background_image_updated_at"
    t.integer  "position",                      null: false
    t.index ["position"], name: "index_campaigns_on_position", using: :btree
    t.index ["user_id"], name: "index_campaigns_on_user_id", using: :btree
  end

  create_table "campaigns_tasks", force: :cascade do |t|
    t.integer "campaign_id"
    t.integer "task_id"
    t.index ["campaign_id"], name: "index_campaigns_tasks_on_campaign_id", using: :btree
    t.index ["task_id"], name: "index_campaigns_tasks_on_task_id", using: :btree
  end

  create_table "event_requests", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.string   "location"
    t.date     "potential_date"
    t.string   "experience_level"
    t.string   "email"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "events", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "name"
    t.text     "description"
    t.string   "image"
    t.string   "url"
    t.date     "date"
    t.string   "location"
    t.text     "instructions"
    t.string   "contact"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.integer  "campaign_id"
    t.index ["campaign_id"], name: "index_events_on_campaign_id", using: :btree
    t.index ["user_id"], name: "index_events_on_user_id", using: :btree
  end

  create_table "events_tasks", force: :cascade do |t|
    t.integer "event_id"
    t.integer "task_id"
    t.index ["event_id"], name: "index_events_tasks_on_event_id", using: :btree
    t.index ["task_id"], name: "index_events_tasks_on_task_id", using: :btree
  end

  create_table "tasks", force: :cascade do |t|
    t.string   "name"
    t.string   "task_manager_url"
    t.integer  "task_type"
    t.text     "description"
    t.string   "image"
    t.integer  "status"
    t.string   "location"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.integer  "osm_id"
    t.string   "email",                  default: "", null: false
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  add_foreign_key "events", "campaigns"
end
