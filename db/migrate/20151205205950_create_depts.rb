class CreateDepts < ActiveRecord::Migration
  def change
    create_table :depts do |t|
      t.string :degree

      t.timestamps null: false
    end
  end
end
