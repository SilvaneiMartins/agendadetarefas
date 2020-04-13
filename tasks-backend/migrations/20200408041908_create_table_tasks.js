/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;  
* Api Agenda de tarefas;
*/
exports.up = function (knex, Promise) {
  return knex.schema.createTable('tasks', table => {
      table.increments('id').primary()
      table.string('desc').notNull()
      table.datetime('estimateAt')
      table.datetime('doneAt')
      table.integer('userId').references('id')
          .inTable('users').notNull()
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('tasks')
};  
